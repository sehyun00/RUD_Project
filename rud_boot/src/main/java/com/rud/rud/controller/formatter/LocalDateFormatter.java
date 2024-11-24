package com.rud.rud.controller.formatter;

<<<<<<< HEAD
=======
import org.springframework.format.Formatter;

>>>>>>> back)logintest
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

<<<<<<< HEAD
import org.springframework.format.Formatter;

/**
 * LocalDateFormatter
 */
public class LocalDateFormatter implements Formatter<LocalDate>{

    @Override
    public LocalDate parse(String text, Locale locale) {
=======
public class LocalDateFormatter implements Formatter<LocalDate> {

    @Override
    public  LocalDate parse(String text, Locale locale){
>>>>>>> back)logintest
        return LocalDate.parse(text, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    @Override
    public String print(LocalDate object, Locale locale) {
        return DateTimeFormatter.ofPattern("yyyy-MM-dd").format(object);
    }
<<<<<<< HEAD

}
=======
}
>>>>>>> back)logintest
