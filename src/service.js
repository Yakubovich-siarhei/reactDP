import axios from "axios";

export default class Service {
  _apiBase = `https://conduit.productionready.io/api`;

  allList = `/articles?limit=10&offset=0`;

  fetchData = async () => {
    await axios.get(
      "https://conduit.productionready.io/api/articles?limit=10&offset=0"
    );
  };

  getResource = async url => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getAllPlanet = async () => {
    const lists = await this.getResource(`/articles?limit=10&offset=0`);
    console.log(lists);
    return lists.results.map(this._transformPlanet);
  };

  _transformPlanet = list => {
    return {
      name: list.slug,
      autor: list.author.username
    };
  };

  // getPersonImage = ({ id }) => {
  //   return ` ${this._imageBase}/characters/${id}.jpg `;
  // };

  // getPlanetImage = ({ id }) => {
  //   return `${this._imageBase}/planets/${id}.jpg `;
  // };

  // getStarshipImage = ({ id }) => {
  //   return ` ${this._imageBase}/starships/${id}.jpg `;
  // };

  // getAllPeople = async () => {
  //   const res = await this.getResource(`/people/`);
  //   return res.results.map(this._transformPerson);
  // };

  // getPerson = async id => {
  //   const person = await this.getResource(`/people/${id}/`);
  //   return this._transformPerson(person);
  // };

  // getAllStarships = async () => {
  //   const res = await this.getResource(`/starships/`);
  //   return res.results.map(this._transformPerson);
  // };

  // getStarship = async id => {
  //   const starship = await this.getResource(`/starships/${id}/`);
  //   return this._transformStarship(starship);
  // };

  // getPlanet = async id => {
  //   const planet = await this.getResource(`/planets/${id}/`);
  //   return this._transformPlanet(planet);
  // };

  // _extractId = item => {
  //   const idRegExp = /\/([0-9]*)\/$/;
  //   return item.url.match(idRegExp)[1];
  // };

  // _transformPerson = person => {
  //   return {
  //     id: this._extractId(person),
  //     name: person.name,
  //     gender: person.gender,
  //     birthYear: person.birth_year,
  //     eyeColor: person.eye_color
  //   };
  // };
  // _transformStarship = starship => {
  //   return {
  //     id: this._extractId(starship),
  //     name: starship.name,
  //     model: starship.model,
  //     length: starship.length,
  //     cost: starship.cost_in_credits
  //   };
  // };
}
