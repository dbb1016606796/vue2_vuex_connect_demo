import fetch from "@/server";

@fetch
class Network {
    _getAdcode = async ()  => {
      const data = await this.$get('http://192.168.5.141:3060/getGeoJson?adcode=440300');
      console.log(data)
    };
}

export default new Network();