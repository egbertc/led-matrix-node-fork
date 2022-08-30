#include <math.h>
#include <pixel-mapper.h>
#include <stdio.h>
#include <string.h>

class GridPixelMapper : public rgb_matrix::PixelMapper {
  public:
	GridPixelMapper() {
	}

	virtual const char *GetName() const {
		return "Grid";
	}

	virtual bool SetParameters(int chain, int parallel, const char *param) {
		chain_	  = chain;
		parallel_ = parallel;

		std::string params(param);
		const int index	 = params.find("x");
		std::string cols = params.substr(0, index);
		std::string rows = params.substr(index + 1);

		try {
			cols_ = std::stoi(cols);
			rows_ = std::stoi(rows);
		}
		catch (...) {
			return false;
		}

		if (cols_ * rows_ != chain_) {
			fprintf(stderr, "Grid: Chain (--led-chain) needs to match cols/rows (%d * %d)\n", cols_, rows_);
			return false;
		}

		return true;
	}

	virtual bool GetSizeMapping(int matrix_width, int matrix_height, int *visible_width, int *visible_height) const {
		*visible_height = matrix_height * rows_;
		*visible_width	= matrix_width / rows_;
		actual_width	= *visible_width;
		actual_height	= *visible_height;
		fprintf(
		  stderr,
		  "matrix_width=%d matrix_height=%d rows = %d cols = %d | %d/%d\n",
		  matrix_width,
		  matrix_height,
		  rows_,
		  cols_,
		  *visible_width,
		  *visible_height);

		return true;
	}

	virtual void
	MapVisibleToMatrix(int matrix_width, int matrix_height, int x, int y, int *matrix_x, int *matrix_y) const {
		int row = y / matrix_height;
		if (row % 2 == 0) {
			 *matrix_y = matrix_height - 1 - (y % matrix_height);
			*matrix_x = (matrix_width - 1) - (((rows_ - row -1) * actual_width) + x);

			  }
		else {
			*matrix_y = (y % matrix_height); //+ (matrix_height * ((row + 1)%2));
			*matrix_x = (row * actual_width) + x;
		}
		if (*matrix_x >= 384 || *matrix_x < 0) { fprintf(stderr, "row: %d\n",row); }
	}

  private:
	int chain_;
	int parallel_;
	int rows_;
	int cols_;
	mutable int actual_width;
	mutable int actual_height;
};
