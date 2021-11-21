/**
 * 
 */
package sms;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

/**
 * @author Triin
 *
 */
public class CryptoToolTests {
	String textToEncrypt = "Kodukana";
	CryptoTool tool;
	
	//Võtmete genereerimimiseks
	String modulusString = "00c8aadbbfc112c8cb20cc7428c2e47ded2b4a89f48a5663eab9066ffc8468815c4122f4c185b3d439afc5a5133741bd3d71eff55b80f65b9d1c444b595da934e376cb89f6913b1668bead0cabcd420ed7eed33bf17b69a75762aa29f9d2709df790dc9152274139311ae52e4f3cd554f3c1ba6426f83758090791cd98a3563a13";
	String publicExp = "10001";
	String privateExp = "4B88ACF1101F1EFFFF1796BDE52697141850957F3C376AA2E704BA50A612A466F289D2F1A97F586A6274963F96742364A6A7B986B91382C6AFE6312AB16BC8E10FA5090B19A3E5D236CF558422637A34A6FCA01E6E3975FC7C8363F723BD1C62978FE8BC0D2A37985C74CA57618644E0F3E78C65EDA544F2569354053B3E0739";

	@Before
	public void init(){
		tool = new CryptoTool();
		tool.setPrivateKey(modulusString, privateExp);
		tool.setPublicKey(modulusString, publicExp);
	}
	
	@Test
	public void encryptAndDecrypt(){
		String encrypted = tool.encrypt(textToEncrypt);
		//System.out.println(encrypted);
		String decrypted = tool.decrypt(encrypted);
		//System.out.println(decrypted);
		assertEquals(textToEncrypt, decrypted);
	}

	


}
