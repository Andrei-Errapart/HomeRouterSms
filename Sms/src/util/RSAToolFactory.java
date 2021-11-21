package util;

import java.security.Security;

//import util.RSATool;

public class RSAToolFactory {

	private static RSATool instance = null;
	
	public static RSATool getRSATool() {
		if(instance == null) {
			Security.addProvider(new org.bouncycastle.jce.provider.BouncyCastleProvider());			
			instance = new RSAToolImpl();
		}
		return instance;
	}

}
