package com.mypro.Sample;

import static org.junit.Assert.*;
import junit.framework.Assert;

import org.junit.Test;

public class SampleTest {

	static int i;
	@Test
	public void check()
	{
		System.out.println("Welcome");
		//Assert.fail();
		i++;
		assertEquals(2, i);
	}
	
	@Test
	public void Myproject()
	{
		
		//Assert.fail();
		
		assertEquals(2, 2);
	}
	@Test
	public void Arumugam()
	{
		System.out.println("Arumugam");
		//Assert.fail();
		
		assertEquals(2, 2);
	}
	@Test
	public void Rajkumar()
	{
		
		assertEquals(2, 2);
	}
	
}
