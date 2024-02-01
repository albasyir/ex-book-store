import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) { }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: string | number): Promise<Book> {
    return this.bookRepository.findOneBy({
      id: +id,
    });
  }

  create(book: Omit<Book, 'id'>): Promise<Book> {
    return this.bookRepository.save(book);
  }

  update(id: string | number, book: Omit<Book, 'id'>): Promise<Book> {
    return this.bookRepository.save({ ...book, id: +id });
  }

  async remove(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
