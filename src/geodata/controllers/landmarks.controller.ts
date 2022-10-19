import { Controller, Get, Query } from '@nestjs/common';
import { ApiExtraModels, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LandmarksService } from '../services/landmarks.service';
import { Landmark } from '../types/landmarks/landmark.type';
import { LandmarksResponse, LandmarksSummaryResponse } from '../responses';

@Controller('landmarks')
@ApiTags('Landmarks')
@ApiExtraModels(Landmark)
export class LandmarksController {
  constructor(private landmarksService: LandmarksService) {}

  @Get('summary')
  @ApiQuery({ type: String, name: 'zipCode' })
  getLandmarksSummary(
    @Query('zipCode') zipCode: string,
  ): LandmarksSummaryResponse {
    const parks = this.landmarksService.getParks(zipCode);
    const libraries = this.landmarksService.getLibraries(zipCode);
    const communityCenters = this.landmarksService.getCommunityCenters(zipCode);
    const ccf = this.landmarksService.getChildCareF(zipCode);
    const ccc = this.landmarksService.getChildCareC(zipCode);

    return new LandmarksSummaryResponse(parks, communityCenters, libraries, ccf, ccc);
  }

  @Get('parks')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getParks(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const parks = this.landmarksService.getParks(zipCode);

    return new LandmarksResponse(parks);
  }

  @Get('libraries')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getLibraries(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const libraries = this.landmarksService.getLibraries(zipCode);

    return new LandmarksResponse(libraries);
  }

  @Get('community')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getCommunityCenters(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const centers = this.landmarksService.getCommunityCenters(zipCode);

    return new LandmarksResponse(centers);
  }

  @Get('cc_family')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getChildCareF(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const ccf = this.landmarksService.getChildCareF(zipCode);

    return new LandmarksResponse(ccf);
  }

  @Get('cc_center')
  @ApiQuery({ type: String, required: false, name: 'zipCode' })
  getChildCareC(@Query('zipCode') zipCode?: string): LandmarksResponse {
    const ccc = this.landmarksService.getChildCareC(zipCode);

    return new LandmarksResponse(ccc);
  }
}
