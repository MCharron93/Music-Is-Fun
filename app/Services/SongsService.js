import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        // console.log(res)
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */

  constructor() {
    this.getMySongs()
  }

  async getMySongs() {
    let res = await sandBoxApi.get()
    //TODO What are you going to do with this result
    let results = res.data.data.map(rawData => new Song(rawData));
    ProxyState.playlist = results
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(id) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
    let song = ProxyState.songs.find(s => s._id == id)
    let res = await sandBoxApi.post("", song)
    // console.log(res.data.data);
    ProxyState.playlist.push(new Song(res.data.data))
    ProxyState.playlist = ProxyState.playlist
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
    // @ts-ignore
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // @ts-ignore
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.getMySongs()
      }
    })
    let deletedSong = await sandBoxApi.delete("" + id)
  }

}

const service = new SongsService();
export default service;
