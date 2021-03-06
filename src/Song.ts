interface Song {
    title: string;
    artist?: string;
    skip: boolean;
    downloaded: boolean;
    playing: boolean;
    requester?: string;
    url: string;
    streamable_url?: string;
    thumb?: string;
    added: Date;
    file?: string;
}

export = Song;