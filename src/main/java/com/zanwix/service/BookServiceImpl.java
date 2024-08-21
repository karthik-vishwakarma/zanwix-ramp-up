package com.zanwix.service;

import com.zanwix.entity.Book;
import com.zanwix.exception.ResponseNotFound;
import com.zanwix.payload.BookDto;
import com.zanwix.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService{


    private BookRepository bookRepo;

    public BookServiceImpl(BookRepository bookRepo) {
        this.bookRepo = bookRepo;
    }

    @Override
    public BookDto addBook(BookDto dto) {
        Book book = new Book();
        book.setId(dto.getId());
        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setPublishedYear(dto.getPublishedYear());
         Book save = bookRepo.save(book);

         BookDto dto1 = new BookDto();
         dto1.setId(save.getId());
         dto1.setTitle(save.getTitle());
         dto1.setAuthor(save.getAuthor());
         dto1.setPublishedYear(save.getPublishedYear());
        return dto1;
    }

    @Override
    public BookDto getBookById(Long id) {
      Book book= bookRepo.findById(id).orElseThrow(
              ()-> new ResponseNotFound("Post Not Found With Id:" + id));

        BookDto dto1 = new BookDto();
        dto1.setId(book.getId());
        dto1.setTitle(book.getTitle());
        dto1.setAuthor(book.getAuthor());
        dto1.setPublishedYear(book.getPublishedYear());
      return dto1;
    }

    @Override
    public  List<Book> listBooks() {
         List<Book> all = bookRepo.findAll();
        return all;
    }

    @Override
    public BookDto updateBook(long id, BookDto bookDto) {Book book = bookRepo.findById(id).orElseThrow(
            () -> new ResponseNotFound("Id Not Found:" + id));

        book.setTitle(bookDto.getTitle());
        book.setAuthor(bookDto.getAuthor());
        book.setPublishedYear(bookDto.getPublishedYear());

        Book save = bookRepo.save(book);

        BookDto dto=new BookDto();
        dto.setId(save.getId());
        dto.setTitle(save.getTitle());
        dto.setAuthor(save.getAuthor());
        dto.setPublishedYear(save.getPublishedYear());
        return dto;
    }

    @Override
    public void deleteBook(Long id) {
        bookRepo.findById(id).orElseThrow(
                () -> new ResponseNotFound("Id Not Found:" + id));
        bookRepo.deleteById(id);

        System.out.println("id is Deleted :" +id);
    }

    }
