export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt = data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    // <source src="${this.preview}" type="audio/ogg">

    return /*html*/ `
    <div class="col-6">
      <img class="img-fluid" src="${this.albumArt}" alt=""/>
      <h3>${this.title}</h3>
      <h4>${this.album}</h4>
      <audio controls>
        <source src="${this.preview}" type="audio/mpeg">
      </audio>
      <h6>${this.price}</h6>
    </div>
        `;
  }

  get playlistTemplate() {
    return `

        `;
  }
}
