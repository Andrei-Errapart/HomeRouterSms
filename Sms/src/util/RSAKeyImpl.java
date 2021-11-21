/**
 * 
 */
package util;

import java.security.Key;

import util.RSAKey;
/**
 * @author Triin
 *
 */



public class RSAKeyImpl implements RSAKey {

	private Key key;

	public RSAKeyImpl(Key key) {
		this.key = key;
	}

	public Key getKey() {
		return key;
	}

}
