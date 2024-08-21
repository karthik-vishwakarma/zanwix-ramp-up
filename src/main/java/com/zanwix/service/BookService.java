package com.zanwix.service;



import com.zanwix.entity.Book;
import com.zanwix.payload.BookDto;

import java.util.List;

public interface BookService {


     public BookDto addBook(BookDto bookDto);
      public BookDto getBookById(Long id);
       public List<Book> listBooks();
       public BookDto updateBook(long id,BookDto bookDto);
        void deleteBook(Long id);
}
