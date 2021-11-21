/**
 * 
 */
package util;

import java.security.Key;

/**
 * @author Triin
 *
 */
public class KeyImpl implements Key{
	private String algorithm = "RSA";
	private byte[] encoded;
	private String primaryEncodingFormat = "ei tea";
	@Override
	public String getAlgorithm() {
		return algorithm;
	}
	@Override
	public byte[] getEncoded() {
		return encoded;
	}
	@Override
	public String getFormat() {
		return primaryEncodingFormat;
	}
	public void setValue(byte[] encoded){
		this.encoded = encoded;
	}

}
