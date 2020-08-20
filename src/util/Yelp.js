const apiKey = '812lnk1E2_stQXcZpi5jZETqJuRPtl3BH6dc62KivVdUo-eZ3eJJlUm16qZjFJtSlzHAt2b58fpB6DwojqPANDnu1mO6GNIiqEO2pxpv0i6MFeeDQVyMZBqcR7EaX3Yx';

export const Yelp = {
    async search(term, location, sortBy) {
        try {
            const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}/autocomplete&sort_by=${sortBy}`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${apiKey}`
                }
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                if (jsonResponse.businesses) {
                    return jsonResponse.businesses.map(business => {
                        return {
                            id: business.id,
                            imageSrc: business.image_url,
                            name: business.name,
                            address: business.location.address1,
                            city: business.location.city,
                            state: business.location.state,
                            zipCode: business.zip_code,
                            category: business.categories[0].title,
                            rating: business.rating,
                            reviewCount: business.review_count,
                            url: business.url,
                            lat: business.coordinates.latitude,
                            long: business.coordinates.longitude
                        }
                    })
                }
            } console.log('Request failed!')
        } catch (e) {
            console.log(e)
        }
    }
}