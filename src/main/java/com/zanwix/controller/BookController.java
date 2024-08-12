package com.zanwix.controller;

import com.zanwix.entity.Book;
import com.zanwix.payload.BookDto;
import com.zanwix.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book")
public class BookController {

    private BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    public ResponseEntity<BookDto>addBook(@RequestBody BookDto dto){
         BookDto bookDto = bookService.addBook(dto);
         return new ResponseEntity<>(bookDto, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<BookDto>getBookById(@PathVariable long id){
         BookDto bookById = bookService.getBookById(id);
         return new ResponseEntity<>(bookById,HttpStatus.OK);
    }

    @GetMapping
    public List<Book>listBooks(){
         List<Book> books = bookService.listBooks();
         return books;
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookDto>updateBook(@RequestBody BookDto bookDto,@PathVariable long id){
        BookDto dto = bookService.updateBook(id,bookDto);
        return new ResponseEntity<>(dto,HttpStatus.OK);
    }
}
