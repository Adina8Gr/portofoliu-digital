/* eslint-disable prettier/prettier */
import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

interface MulterFile {
  originalname: string;
  filename: string;
}

@Controller('files')
export class FilesController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
        cb(null, `${file.fieldname}-${uniqueSuffix}`);
      },
    }),
  }))
  uploadFile(@UploadedFile() file: MulterFile) {
    return {
      originalname: file.originalname,
      filename: file.filename,
    };
  }
}
