package com.example.my.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
public class HelloController {
    @GetMapping("/")
    public String hello() {
        return "<h1>안녕 파일 실습 ㄱㄱ</h1>";
    }

    @GetMapping("/data")
    // @ResponseBody
    public String data() {
        return "<h1>Hello Spring data</h1>";
    }
}
