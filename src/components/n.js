imagesApi
        .fetchApi(currentSearch, currentPage)
        .then(data => data.hits)
        .then(images => {
          if (images.length === 0) {
            toast.info('There are no images for your request.', {
              position: 'top-center',
            });
          }
          this.setState({ images, status: 'resolved', visible: true });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
      return;
    }