package com.chen_yonati.notes_keeper;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class NotesKeeperApplication {

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(NotesKeeperApplication.class, args);
		AppService appService = ctx.getBean(AppService.class);
//		appService.init();
	}

}
