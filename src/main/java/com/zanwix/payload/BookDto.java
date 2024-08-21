package com.zanwix.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {

    private long id;
    private String title;
    private String author;
    private int publishedYear ;

}
