/**
 * 
 */
package util;

import java.math.BigInteger;
import java.nio.ByteBuffer;
import java.nio.IntBuffer;
import java.security.SecureRandom;

import org.bouncycastle.util.encoders.Base64;

/**
 * @author Triin
 *
 */
public class RSA {
	BigInteger n;
	BigInteger e;
	// Set the public key fields N and e from hex strings
	public void RSASetPublic(String N,String E) {
	  if(N != null && E != null && N.length() > 0 && E.length() > 0) {
	    this.n = new BigInteger(N,16);
	    this.e = new BigInteger(E,16);
	  }
	  else
	    System.out.println("Invalid RSA public key");
	}
	
	// Return the PKCS#1 RSA encryption of "text" as an even-length hex string
	public String RSAEncrypt(String text) {
	  BigInteger m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
	  if(m == null) return null;
	  BigInteger c = m.modPow(e, n);
	  if(c == null) return null;
	  String h = new String(Base64.encode(c.toByteArray()));
	  System.out.println("h on: " + h);
	//String h = ConvertHexStringToBase64(new String(bytes));
	  if((h.length() & 1) == 0) return h; else return "0" + h;
	}
	// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
	private BigInteger pkcs1pad2(String s,int n) {
	  if(n < s.length() + 11) { // TODO: fix for utf-8
	    System.out.println("Message too long for RSA");
	    return null;
	  }
	  int[] ba = new int[1000000];
	  int i = s.length() - 1;
	  while(i >= 0 && n > 0) {
	    //var c = s.charCodeAt(i--);
	    int c = Character.codePointAt(s, i--);
	    if(c < 128) { // encode using utf-8
	      ba[--n] = c;
	    }
	    else if((c > 127) && (c < 2048)) {
	      ba[--n] = (c & 63) | 128;
	      ba[--n] = (c >> 6) | 192;
	    }
	    else {
	      ba[--n] = (c & 63) | 128;
	      ba[--n] = ((c >> 6) & 63) | 128;
	      ba[--n] = (c >> 12) | 224;
	    }
	  }
	  ba[--n] = 0;
	  SecureRandom rng = new SecureRandom();
	  byte[] x = new byte[1000000]; //HARDCODED!!!
	  while(n > 2) { // random non-zero pad
	    x[0] = 0;
	    while(x[0] == 0) rng.nextBytes(x);
	    ba[--n] = x[0];
	  }
	  ba[--n] = 2;
	  ba[--n] = 0;
	  //System.out.println("BigInteger.toString: " + ba.toString());
	  return toBigInteger(ba);
	}
	public BigInteger toBigInteger(int[] data) {
	    byte[] array = new byte[data.length * 4];
	    ByteBuffer bbuf = ByteBuffer.wrap(array);
	    IntBuffer ibuf = bbuf.asIntBuffer();
	    ibuf.put(data);
	    return new BigInteger(array);
	}
	// Return the PKCS#1 RSA encryption of "text" as a Base64-encoded string
	
	private static String ConvertHexStringToBase64(String hexString) {
	    System.out.println(hexString);
	    if ((hexString.length()) % 2 > 0)
	          throw new NumberFormatException("Input string was not in a correct format.");
	    byte[] buffer = new byte[hexString.length() / 2];
        int i = 2;
        while (i < hexString.length())
        	{
            buffer[i / 2] = (byte)Integer.parseInt(hexString.substring(i, i + 2),16);
            i += 2;
        }
	    System.out.println("hexSring"+hexString+"afterconverttobase64"+new String(Base64.encode(buffer)));
	    return new String(Base64.encode(buffer));

	}
	
}
