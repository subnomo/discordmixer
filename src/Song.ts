interface Song {
    title: string;
    artist?: string;
    skip: boolean;
    requester?: string;
    url: string;
    thumb?: string;
}

export = Song;