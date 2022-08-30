#include <math.h>
#include <pixel-mapper.h>
#include <stdio.h>
#include <string.h>

class FlipPanelPixelMapper : public rgb_matrix::PixelMapper {
  public:
	FlipPanelPixelMapper() {
	}

	virtual const char *GetName() const {
		return "FlipPanel";
	}

	virtual bool SetParameters(int chain, int parallel, const char *param) {
		chain_	  = chain;
		parallel_ = parallel;

		std::string panelNumStr(param);

		try {
			panelNum_ = std::stoi(panelNumStr);
			if(!(panelNum_ >= 0 && panelNum_ < chain_)) {
				fprintf(stderr, "FlipPanel: Panel Index (%d) needs to be greater than 0 and less than Chain (--led-chain)\n", panelNum_);
				return false;
			}
		}
		catch (...) {
			return false;
		}

		return true;
	}

	virtual bool GetSizeMapping(int matrix_width, int matrix_height, int *visible_width, int *visible_height) const {
		*visible_height = matrix_height;
		*visible_width	= matrix_width;
		panelWidth_		= matrix_width / chain_;

		return true;
	}

	virtual void
	MapVisibleToMatrix(int matrix_width, int matrix_height, int x, int y, int *matrix_x, int *matrix_y) const {
		int index = chain_ - (panelNum_ + 1);
		if (x / panelWidth_ == chain_ - (panelNum_ + 1)) {
			int panel_x = x % 32;
			*matrix_x = x - panel_x + 31 - panel_x;
			*matrix_y = matrix_height - 1-y;
			return;
		}

		*matrix_x = x;
		*matrix_y = y;
	}

  private:
	int chain_;
	int parallel_;
	int panelNum_;
	mutable int panelWidth_;
};
