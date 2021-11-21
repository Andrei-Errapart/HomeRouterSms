/**
 * 
 * TODO: getting modulus and exponents from keys.
 * TODO: loading, setting and using keys
 * TODO: Doesn't understand URL-encoded slashes and the like
 */
package sms;

import java.math.BigInteger;
import java.net.URLEncoder;
import java.security.KeyFactory;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Security;
import java.security.spec.RSAPrivateKeySpec;
import java.security.spec.RSAPublicKeySpec;

import javax.crypto.Cipher;

import org.bouncycastle.util.encoders.Base64;

/**
 * @author Triin
 *
 */
public class CryptoTool {
	/**
	 * TODO: replace x
	 * x-bit RSA public key for encryption
	 */
	private PublicKey publicKey;
	private PrivateKey privateKey;
	/**
	 * 
	 */
	private BigInteger modulus;
	private BigInteger publicExponent;
	private BigInteger privateExponent;
	
	private Cipher cipher;
	
	public CryptoTool(){
		init();
	}
	private void init(){
		//To be able to use BouncyCastle "RSA/NONE/PKCS1PADDING" cipher
		Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());
		//Preparation for encrypting and decrypting.
		try{
			this.cipher = Cipher.getInstance("RSA/NONE/PKCS1Padding", "BC");
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public void setPublicKey(String modulus, String publicExponent){
		this.setModulus(modulus);
		this.setPublicExponent(publicExponent);
		
		try{
			RSAPublicKeySpec spec = new RSAPublicKeySpec(this.modulus, this.publicExponent);
			KeyFactory factory = KeyFactory.getInstance("RSA");
			publicKey = factory.generatePublic(spec);
		}catch(Exception e){
			System.out.println("Failed to generate a public key from modulus and exponent");
			e.printStackTrace();
		}
	}
	
	public void setPrivateKey(String modulus, String privateExponent){
		this.setModulus(modulus);
		this.setPrivateExponent(privateExponent);
	
		try{
			RSAPrivateKeySpec spec2 = new RSAPrivateKeySpec(this.modulus, this.privateExponent);
			KeyFactory fact = KeyFactory.getInstance("RSA");
		    privateKey = fact.generatePrivate(spec2);
		}catch(Exception e){
			System.out.println("Failed to generate private key from modulus and exponent");
		}
	}
	
	/**
	 * 
	 * @param modulus - modulus in Hex
	 */
	private void setModulus(String modulus){
		//From base16 to base10
		this.modulus = new BigInteger(modulus, 16);
	}
	/**
	 * 
	 * @param publicExponent - public exponent in Hex, needed for encryption.
	 */
	private void setPublicExponent(String publicExponent){
		//From base16 to base10
		this.publicExponent = new BigInteger(publicExponent, 16);
	}
	/**
	 * 
	 * @param privateExponent - private exponent in Hex, needed for decryption.
	 */
	private void setPrivateExponent(String privateExponent){
		//From base16 to base10
		this.privateExponent = new BigInteger(privateExponent, 16);
	}
	/**
	 * 
	 * @param plainText - normal, base64 text to encrypt
	 * @return - encrypted text in base 64
	 */
	public String encrypt(String plainText){
		byte[] cipherText = null;
		String cipherTextBase64 = null;

		try{
			//Initialize cipher
			cipher.init(Cipher.ENCRYPT_MODE, publicKey, new SecureRandom());
			//Perform encryption
			cipherText = cipher.doFinal(plainText.getBytes());
			
			//System.out.println("CipherText in Hex: " + bytesToHex(cipherText)); //Display encrypted text in Hex
			cipherTextBase64 = new String(Base64.encode(cipherText));
			
			//System.out.println("CipherText base64: " + cipherTextBase64); //Display encrypted text in base64
		}catch(Exception e){
			e.printStackTrace();
		}
		return cipherTextBase64;
	}
	/**
	 * 
	 * @param cipherText
	 * @return
	 */
	public String decrypt(String cipherText){
		byte[] plainText = null;
		byte[] cipherTextBytes = Base64.decode(cipherText);
		
		//System.out.println("Encrypted text in Hex: " + bytesToHex(cipherTextBytes)); //Print out encrypted text in Hex a.k.a. more readable format
		try{
		    
		    cipher.init(Cipher.DECRYPT_MODE, privateKey);
		    plainText = cipher.doFinal(cipherTextBytes);
		    //System.out.println("Decrypted text: " + new String(plainData));
		}catch(Exception e){
			e.printStackTrace();
		}
		return new String(plainText);
	}

	/**
	 * For displaying encrypted text in Hex instead of boxes and question-marks
	 * @param bytes
	 * @return
	 */
	public static String bytesToHex(byte[] bytes) {
		final char[] hexArray = {'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};
	    char[] hexChars = new char[bytes.length * 2];
	    int v;
	    for ( int j = 0; j < bytes.length; j++ ) {
	        v = bytes[j] & 0xFF;
	        hexChars[j * 2] = hexArray[v >>> 4];
	        hexChars[j * 2 + 1] = hexArray[v & 0x0F];
	    }
	    return new String(hexChars);
	}
	
}
