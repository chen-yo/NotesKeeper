package com.chen_yonati.notes_keeper;

import com.chen_yonati.notes_keeper.model.User;
import com.chen_yonati.notes_keeper.services.AppService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import javax.servlet.http.HttpServletRequest;

@SpringBootApplication
public class NotesKeeperApplication {

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(NotesKeeperApplication.class, args);
		AppService appService = ctx.getBean(AppService.class);
		appService.init();
	}
}
