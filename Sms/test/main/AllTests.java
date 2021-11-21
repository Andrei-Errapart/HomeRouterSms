package main;

import static org.junit.Assert.*;

import java.io.IOException;
import java.net.HttpCookie;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.Date;

import org.junit.Before;
import org.junit.Test;

import sms.CryptoTool;

import net.sf.corn.httpclient.HttpForm;
import net.sf.corn.httpclient.HttpResponse;

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
			form = new HttpForm(new URI("http://homerouter.cpe/index/login.cgi"));
			String encryptedPassword = tool.encrypt("Loksa9Sms");
			String urlEncodedPassword = URLEncoder.encode(encryptedPassword, "UTF-8");
			//System.out.println("URL encoded password: " + urlEncodedPassword);
			//form.setCredentials("admin", encryptedPassword);
			form.putFieldValue("Username", "admin");
			form.putFieldValue("Password", urlEncodedPassword);

			Date date = new Date();
			date.setTime(date.getTime()+(365*24*60*60*1000));
			//TODO: To replace toGMTString method
			String expires = "; expires="+date.toGMTString();
			String lantype = "en_us";
			String cookieString = "Language="+lantype+ expires + "; path=/";
			
			form.addCookies(cookieString);
			form.putAdditionalRequestProperty("Referer", "http://homerouter.cpe/");
			
			//HttpCookie cookie1 = new HttpCookie("language", "en_us");
			//HttpCookie cookie2 = new HttpCookie("SessionID_R3", "149102587");
			//form.addCookie(cookie1);
			//form.addCookie(cookie2);
		
			//form.putAdditionalRequestProperty("Referer", "http://homerouter.cpe/");
			System.out.println("ToPost string: " + form.toPostString());
			System.out.println("Cookies string: " + form.getCookiesString());
			HttpResponse response = form.doPost();
			System.out.println("Response cookies: " + response.getCookies());
			System.out.println("Response code: " + response.getCode());
			//System.out.println("Response data: " + response.getData());
			System.out.println("Response message: " + response.getMessage());
			System.out.println("Response header fields: " + response.getHeaderFields());
			
			assertFalse(response.hasError());
			assertNotNull(response.getData());
			System.out.println(response.getData());
			//assertTrue(response.getData().contains("password"));
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
