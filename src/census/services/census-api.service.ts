import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CensusAPIService {
  private census = require('citysdk');
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('CENSUS_API_KEY');
  }

  /**
   * Build a CitySDK/Census request
   * @param sourcePath - Values like 'acs', 'acs5', 'subject' (which builds a URL like /acs/acs5/subject)
   * @param values - Values like 'NAME', 'S0101_C06_022E' (which is apart of the get list)
   * @param vintage - Optionally specify a vintage, defaults to 2018
   */
  buildRequest(sourcePath: string[], values: string[], vintage = 2018) {
    const requestObject = {
      vintage,
      geoHierarchy: {
        state: '47',
        county: '157',
      },
      sourcePath,
      values,
      statsKey: this.apiKey,
    };

    return new Promise((resolve) => {
      this.census(requestObject, (censusErr, censusRes) => {
        if (!!censusErr) {
          console.error(censusErr);
          resolve(censusErr);
        } else {
          resolve(censusRes);
        }
      });
    });
  }

  testRequest() {
    return this.buildRequest(['acs', 'acs5', 'subject'], ['NAME', 'S0101_C06_022E']);
  }
}
