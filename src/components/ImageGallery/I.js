// getDataForGallery = () => {
//   const { currentPage } = this.state;
//   const { query } = this.props;

//   this.setState(prevState => ({ loading: true, hits: prevState.hits }));
//   pixabayApi
//     .fetchImage(query, currentPage)
//     .then(({ hits }) => {
//       this.setState(prevState => ({
//         hits: [...prevState.hits, ...hits],
//         currentPage: prevState.currentPage + 1,
//       }));
//     })
//     .catch(error => this.setState({ error }))
//     .finally(() => this.setState({ loading: false }));
// };
