import { PixelMapper, PixelMapperType } from './types';

export class LedMatrixUtils {
  static encodeMappers(...mappers: PixelMapper[]): string {
    return mappers
      .map(mapper => {
        switch (mapper.type) {
          case PixelMapperType.Chainlink:
            return PixelMapperType.Chainlink;
          case PixelMapperType.Rotate:
            return [PixelMapperType.Rotate, mapper.angle].join(':');
          case PixelMapperType.U:
            return PixelMapperType.U;
          case PixelMapperType.V:
            return PixelMapperType.V;
          case PixelMapperType.VZ:
            return PixelMapperType.VZ;
          case PixelMapperType.Grid:
            return `${PixelMapperType.Grid}:${mapper.cols}x${mapper.rows}`
        }
      })
      .join(';');
  }
}
