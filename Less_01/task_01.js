let musicCollection = {
    alboms: [
        {
            title: "albom1",
            artist: "artist1",
            year: "2021"
        },
        {
            title: "albom2",
            artist: "artist2",
            year: "2022"
        },
        {
            title: "albom3",
            artist: "artist3",
            year: "2023"
        },
    ],
    [Symbol.iterator]() {
        let countAlboms = 0;
        return {next:(() => {
            return countAlboms >= this.alboms.length 
            ? {done: true}
            : {value: this.alboms[countAlboms++], done: false}
        })}
    }
};

for (let albom of musicCollection) {
    console.log(`${albom.title} - ${albom.artist} (${albom.year})`);
}