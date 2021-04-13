package com.chen_yonati.notes_keeper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
public class MainController {

    @Autowired
    private AppService appService;

//    @RequestMapping("/login")
//    String login (@RequestParam String user, @RequestParam String password) {
//        User n = new User();
//        n.setName("Chen"+new Date().toString());
//        n.setEmail("Fun@ccc.com");
//        n.setPassword("123");
//        n.setToken("11112sdas2eesdfas");
//        User updatedUser = userRepository.save(n);
//        return "Saved";
//    }
//
//    @GetMapping(path="/all")
//    public @ResponseBody Iterable<User> getAllUsers() {
//        // This returns a JSON or XML with the users
//        return userRepository.findAll();
//    }
}
