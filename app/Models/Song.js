export default class Song {
  // .replace(/100x100/g, "300x300");/
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt = data.albumArt || data.artworkUrl100
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    // <source src="${this.preview}" type="audio/ogg">

    return /*html*/ `
    <div class="col-12">
      <img class="img-fluid" src="${this.albumArt}" alt=""/>
      <h3>${this.title}</h3>
      <h4>${this.album}</h4>
      <audio controls>
        <source src="${this.preview}" type="audio/mpeg">
      </audio>
      <h6>Buy: $${this.price}</h6> <button class="btn btn-success" onclick="app.songsController.addSong('${this._id}')">Add to Library</button>
    </div>
        `;
  }

  get playlistTemplate() {
    return `

        `;
  }
}
