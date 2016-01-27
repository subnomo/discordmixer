interface Song {
    title: string;
    artist?: string;
    skip: boolean;
    downloaded: boolean;
    playing: boolean;
    requester?: string;
    url: string;
    thumb?: string;
    added: Date;
}

export = Song;