package main;

import static org.junit.Assert.*;

import java.io.IOException;
import java.net.HttpCookie;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.SimpleTimeZone;

import org.junit.Before;
import org.junit.Test;

import sms.CryptoTool;

import net.sf.corn.httpclient.HttpForm;
import net.sf.corn.httpclient.HttpResponse;
import net.sf.corn.httpclient.HttpClient;
import net.sf.corn.httpclient.SimpleCookieStore;
import net.sf.corn.httpclient.TSAuthenticator;





public class AllTests {
	CryptoTool tool = new CryptoTool();
	String modulus = "BEB90F8AF5D8A7C7DA8CA74AC43E1EE8A48E6860C0D46A5D690BEA082E3A74E1"
			 +"571F2C58E94EE339862A49A811A31BB4A48F41B3BCDFD054C3443BB610B5418B"
			 +"3CBAFAE7936E1BE2AFD2E0DF865A6E59C2B8DF1E8D5702567D0A9650CB07A43D"
			 +"E39020969DF0997FCA587D9A8AE4627CF18477EC06765DF3AA8FB459DD4C9AF3";;
	String publicExponent = "10001";
	
	@Before
	public void init(){
		tool.setPublicKey(modulus, publicExponent);
	}
	
	@Test
	public void test1() {
		HttpForm form;
		try {
			//form = new HttpForm(new URI("http://localhost:8888")); //Fiddler
			form = new HttpForm(new URI("http://homerouter.cpe/index/login.cgi")); //Real URL
			String encryptedPassword = tool.encrypt("Loksa9Sms");
			//System.out.println(encryptedPassword);
			//String urlEncodedPassword = URLEncoder.encode(encryptedPassword, "UTF-8");
			//System.out.println("URL encoded password: " + urlEncodedPassword);
			//form.setCredentials("admin", encryptedPassword); //alternative to form.outFieldValue
			form.putFieldValue("Username", "admin");
			form.putFieldValue("Password", encryptedPassword);

			Date date = new Date();
			date.setTime((date.getTime()+(365*24*60*60*1000L)));
	
			String expires = "; Expires="+toGMTString(date);
			String lantype = "en_us";
			//String cookieString = "SessionID_R3=1994847813; Language="+lantype+ expires + "; Domain=.homerouter.cpe; Path=/;";
			String cookieString = "Language="+lantype+expires + "; Domain=.homerouter.cpe; Path=/;";
			//String c = "SessionID_R3=1994847813; path=/; domain=homerouter.cpe"
			form.addCookies(cookieString);
			form.putAdditionalRequestProperty("Referer", "http://homerouter.cpe/");
			form.setKeepAlive(true);
		
			System.out.println("ToPost string: " + form.toPostString());
			System.out.println("Cookies string: " + form.getCookiesString());
			System.out.println("Form to send: " + form.toString()); //corn kuvab v‰ljade v‰‰rtused miskip‰rast tagurpidi j‰rjekorras
			HttpResponse response = form.doPost();
			System.out.println("Response cookies: " + response.getCookies());
			System.out.println("Response code: " + response.getCode());
			//System.out.println("Response data: " + response.getData());
			System.out.println("Response message: " + response.getMessage());
			System.out.println("Response header fields: " + response.getHeaderFields());
			System.out.println("Form: " + form.toString());
			
			assertFalse(response.hasError());
			assertNotNull(response.getData());
			System.out.println(response.getData());
			assertTrue(response.getData().contains("overview"));
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	/**
	 * Makes a date string suitable for using in cookies. 
	 * Needed because default toGMTString method doesn't 
	 * include weekday and displays month in local language
	 * @param date
	 * @return date as string for use in cookies
	 */
	public String toGMTString(Date date){
		
		SimpleDateFormat sdf = new SimpleDateFormat("EEE, dd MMM yyyy HH:mm:ss z", Locale.US);
		sdf.setTimeZone(new SimpleTimeZone(0, "GMT"));
		Date testDate = new Date(date.getTime());

		// Print string using recommended method
		//System.out.println(sdf.format(testDate));
		return sdf.format(testDate);
	}
}
