type CurrentBanner = {
  bannerId: string;
  bannerTitle: string;
  bannerImage: {
    fileName: string;
    filePath: string;
  };
  bannerLink: string;
};

type AllBanners = CurrentBanner[];

interface Banner {
  currentBanner: CurrentBanner;
  allBanners: AllBanners;
  searchedBanners: AllBanners;
}

interface GetBanners extends Action {
  payload: Promise<AllBanners>;
}

interface GetBanner extends Action {
  payload: Promise<CurrentBanner>;
}

type BannerAction = GetBanners | GetBanner | MessageAction | Action;
