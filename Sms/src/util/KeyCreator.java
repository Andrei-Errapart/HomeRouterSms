package util;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigInteger;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SealedObject;

import main.PrivateKeyReader;
import main.PublicKeyReader;

import org.bouncycastle.crypto.params.RSAKeyParameters;
import org.bouncycastle.jce.provider.JCERSAPublicKey;
import org.bouncycastle.util.encoders.Base64;
import org.bouncycastle.util.encoders.Base64Encoder;

public class KeyCreator {
	private String password = "Loksa9Sms";
	private String modulus64 = "BEB90F8AF5D8A7C7DA8CA74AC43E1EE8A48E6860C0D46A5D690BEA082E3A74E1"
			 +"571F2C58E94EE339862A49A811A31BB4A48F41B3BCDFD054C3443BB610B5418B"
			 +"3CBAFAE7936E1BE2AFD2E0DF865A6E59C2B8DF1E8D5702567D0A9650CB07A43D"
			 +"E39020969DF0997FCA587D9A8AE4627CF18477EC06765DF3AA8FB459DD4C9AF3";
	
	private final BigInteger MODULUS = new BigInteger(modulus64, 16);
	private final BigInteger EXPONENT = new BigInteger("10001");
	byte[] passwordInBytes = password.getBytes();
	
	public void createPublicKey(){
		//RSAPublicKey rsaPubKey = new JCERSAPublicKey(
		//	    new RSAKeyParameters(false, MODULUS, EXPONENT));
		
		///////////
		/*
		try{
			RSATool tool1 = RSAToolFactory.getRSATool();
			tool1.generateKeyPair(new File("public.pem"), new File("private.pem"));
			RSAKey publicKey = tool1.loadPublicKey(new File("public.pem"));
			RSAKey privateKey = tool1.loadPrivateKey(new File("private.pem"));
			RSAKeyImpl key = (RSAKeyImpl) publicKey;
			System.out.println("public key: " + key.getKey());
			System.out.println("format: " + key.getKey().getFormat());
			byte[] bytes = key.getKey().getEncoded();
			//String result = encoder.encode(bytes, 0, 0, null);
			//Base64.encode(bytes);
			System.out.println("encoded: " + new String(key.getKey().getEncoded()));
			System.out.println("--------");
		}catch(Exception e){
			e.printStackTrace();
		}
		
		*/
		
		///////
		PublicKey pub = null;
		PrivateKey priv = null;
		RSATool tool = RSAToolFactory.getRSATool();
		
		//System.out.println("MODULUS: " + MODULUS);
		//System.out.println("EXPONENT: " + EXPONENT);
		try{
			pub = PublicKeyReader.get("public11.pem");
			priv = PrivateKeyReader.get("private11.pem");
		}catch(Exception e){
			
		}
		System.out.println(pub.toString());
		System.out.println("Encoded: " + new String(pub.getEncoded()));
		
		
		/* save the public key in a file */
		try{
			byte[] key = pub.getEncoded();
			FileOutputStream keyfos = new FileOutputStream("public_key.pem");
			keyfos.write(key);
			keyfos.close();
		}catch(FileNotFoundException e){
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		//BigInteger message = passwordInBytes.;
		
		//Encrypts the message
		//BigInteger encryptedMessage = message.modPow(EXPONENT, MODULUS);
		
		
		//Signature verifier = Signature.getInstance("SHA1withRSA");
		//verifier.initVerify(pub);
		//verifier.update(url.getBytes("UTF-8")); // Or whatever interface specifies.
//		boolean okay = verifier.verify(signature);
 
/*
		RSAKey publicKey = null;
		try {
			publicKey = tool.loadPublicKey(new File("public_key.pem"));
			//RSAKey privateKey = tool.loadPrivateKey(new File("private.pem"));
            
			byte[] encoded = tool.encryptWithKey(passwordInBytes, publicKey);
			System.out.println("Encoded string: " + new String(encoded));
			
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (ClassNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (InvalidKeySpecException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (NoSuchAlgorithmException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} /*catch (InvalidKeyException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (BadPaddingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  catch (InvalidKeyException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (BadPaddingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
*/	
		
		try{
			// Get an instance of the Cipher for RSA encryption/decryption
			Cipher c = Cipher.getInstance("RSA");
			// Initiate the Cipher, telling it that it is going to Encrypt, giving it the public key
			c.init(Cipher.ENCRYPT_MODE, pub); 
			// Create a secret message
			String myMessage = new String("Loksa9Sms");
			byte[] ciphertext;
			// Encrypt that message using a new SealedObject and the Cipher we created before
			//SealedObject myEncryptedMessage = new SealedObject(myMessage, c);
			
			ciphertext = c.doFinal(myMessage.getBytes("UTF8"));
			System.out.println("new String: "+new String(ciphertext));
			System.out.println("Base64: "+Base64.encode(ciphertext));
			System.out.println("new String with UTF-8"+new String(ciphertext, "UTF-8"));
						
			
			//encodeBASE64(ciphertext);

			
			
		}catch(NoSuchPaddingException e){
			e.printStackTrace();
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (IllegalBlockSizeException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (BadPaddingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	//Mainist:
	//Võtmete lugemine failist
			/*
			RSATool tool = RSAToolFactory.getRSATool();
			try{
				pub = PublicKeyReader.get("example_public.pem");
				priv = PrivateKeyReader.get("private11.pem");
			}catch(Exception e){
				
			}
			*/
		
			//KeyCreator keyCreator = new KeyCreator();
			//keyCreator.createPublicKey();
			/*try{
				RSA rsa = new RSA();
				rsa.RSASetPublic(modulus, publicExponent);
				String encoded = rsa.RSAEncrypt("Loksa9Smskkk");
				System.out.println("Kodeeritud teksti pikkus on " + encoded.length());
				System.out.println(encoded);
				*/
				/*
				RSATool tool = RSAToolFactory.getRSATool();
				byte[] decoded = tool.decryptWithKey(encoded.getBytes(), privateKey);
				System.out.println("Decoded string: " + new String(decoded));*/
				
				/*
				Cipher cipher = Cipher.getInstance("RSA/NONE/PKCS1Padding", "BC");
				cipher.init(Cipher.DECRYPT_MODE, ((RSAKeyImpl)privateKey).getKey());
				byte[] plainText = cipher.doFinal(encoded.getBytes());
				System.out.println("plain : " +new String(plainText));*/
			/*}catch(Exception e){
				e.printStackTrace();
			}*/
}
