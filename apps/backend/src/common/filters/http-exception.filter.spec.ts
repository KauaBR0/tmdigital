import { Test, TestingModule } from '@nestjs/testing';
import { HttpExceptionFilter } from './http-exception.filter';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpExceptionFilter],
    }).compile();

    filter = module.get<HttpExceptionFilter>(HttpExceptionFilter);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('should catch http exception', () => {
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockImplementation(() => ({
      json: mockJson,
    }));
    const mockGetResponse = jest.fn().mockImplementation(() => ({
      status: mockStatus,
    }));
    const mockGetRequest = jest.fn().mockImplementation(() => ({
      url: '/test-url',
    }));
    const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
      getResponse: mockGetResponse,
      getRequest: mockGetRequest,
    }));

    const mockArgumentsHost = {
      switchToHttp: mockHttpArgumentsHost,
    };

    const exception = new HttpException('Test error', HttpStatus.BAD_REQUEST);
    const loggerSpy = jest
      .spyOn(Logger.prototype, 'error')
      .mockImplementation();

    filter.catch(exception, mockArgumentsHost as unknown as ArgumentsHost);

    expect(mockHttpArgumentsHost).toHaveBeenCalledTimes(1);
    expect(mockGetResponse).toHaveBeenCalledTimes(1);
    expect(mockGetRequest).toHaveBeenCalledTimes(1);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockJson).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      timestamp: expect.any(String),
      path: '/test-url',
      message: 'Test error',
    });
    expect(loggerSpy).toHaveBeenCalled();
  });
});
