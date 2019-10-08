declare interface IRoute {
  path: string;
  methods: {
    [method: string]: {
      handler: Function,
      options: Object
    }
  }
}