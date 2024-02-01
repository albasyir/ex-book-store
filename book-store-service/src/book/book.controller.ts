import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';
import { AddBookDto } from './dto/add-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly booksService: BookService) { }

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() book: AddBookDto): Promise<Book> {
    return this.booksService.create(book);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() book: Book): Promise<Book> {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
