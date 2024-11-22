// package com.rud.rud;

// import static org.junit.jupiter.api.Assertions.assertEquals;

// import java.text.SimpleDateFormat;
// import java.time.LocalDateTime;
// import java.time.ZoneId;
// import java.util.Date;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.context.SpringBootTest;

// import com.rud.rud.rud.Rud;
// import com.rud.rud.rud.RudRepository;

// @SpringBootTest
// class RudApplicationTests {

// 	@Autowired
// 	private RudRepository rudRepository;
//     LocalDateTime now = LocalDateTime.now();
//     Date date = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
//     SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

// 	@Test
// 	void loginrud() {
// 		try {
// 			Rud rud = this.rudRepository.findByUserIdandDate("qwer", "2024-11-14 17:18:59");
// 			assertEquals(1, rud.getId());
// 		} catch (Exception e) {
// 			e.printStackTrace();
// 		}

// 	}
// }
