package com.example.demo;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Disabled("Isključen na CI-ju: integracioni contextLoads zahteva DB. Koristimo unit testove.")
class DemoApplicationTests {

	@Test
	void contextLoads() {
	}

}
