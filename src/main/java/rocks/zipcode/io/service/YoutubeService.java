package rocks.zipcode.io.service;

import com.google.api.client.googleapis.json.GoogleJsonResponseException;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.ResourceId;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import com.google.api.services.youtube.model.Thumbnail;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class YoutubeService {
    private static final String PROPERTIES_FILENAME = "youtube.properties";
    private static final long NUMBER_OF_VIDEOS_RETURNED = 25;

    private YouTube getYoutube() {
        return new YouTube.Builder(new NetHttpTransport(), new JacksonFactory(), request -> {
        }).setApplicationName("youtube-cmdline-search-sample").build();
    }

    //Jose's : for searching by search term
    public Iterable<rocks.zipcode.io.domain.SearchResult> search(String searchTerm) {
        try {
            YouTube.Search.List search = buildSearch();
            search.setQ(searchTerm);

            SearchListResponse searchResponse = search.execute();
            List<SearchResult> searchResultList = searchResponse.getItems();

            return searchResultList.stream()
                .map(this::convertSearchResult)
                .collect(Collectors.toList());

        } catch (GoogleJsonResponseException e) {
            System.err.println("There was a service error: " + e.getDetails().getCode() + " : "
                + e.getDetails().getMessage());
        } catch (IOException e) {
            System.err.println("There was an IO error: " + e.getCause() + " : " + e.getMessage());
        } catch (Throwable t) {
            t.printStackTrace();
        }
        return null;
    }

    //De'Jon's : for browsing by Category
    public Iterable<rocks.zipcode.io.domain.SearchResult> searchByCategory(String categoryId) {
        try {
            YouTube.Search.List search = buildSearch();
            search.setVideoCategoryId(categoryId);

            SearchListResponse searchResponse = search.execute();
            List<SearchResult> searchResultList = searchResponse.getItems();

            return searchResultList.stream()
                .map(this::convertSearchResult)
                .collect(Collectors.toList());

        } catch (GoogleJsonResponseException e) {
            System.err.println("There was a service error: " + e.getDetails().getCode() + " : "
                + e.getDetails().getMessage());
        } catch (IOException e) {
            System.err.println("There was an IO error: " + e.getCause() + " : " + e.getMessage());
        } catch (Throwable t) {
            t.printStackTrace();
        }
        return null;
    }

    //Demetrius' : for pulling top trending
    public Iterable<rocks.zipcode.io.domain.SearchResult> searchTopTrending() {
        try {
            YouTube.Search.List search = buildSearch();
            search.setChannelId("UCtg5C-d_3rPUgMaxr285mQQ");
            search.setMaxResults(5L);

//            HashMap<String, String> parameters = new HashMap<>();
//            parameters.put("part", "snippet");
//            parameters.put("maxResults", "25");
//            parameters.put("q", "");
//            parameters.put("type", "video");
//            parameters.put("channelId","UCtg5C-d_3rPUgMaxr285mQQ");
//
//            YouTube.Search.List searchListByKeywordRequest = getYoutube().search().list(parameters.get("part"));
//            if (parameters.containsKey("maxResults")) {
//                searchListByKeywordRequest.setMaxResults(Long.parseLong(parameters.get("maxResults")));
//            }
//
//            if (parameters.containsKey("q") && parameters.get("q") != "") {
//                searchListByKeywordRequest.setQ(parameters.get("q"));
//            }
//
//            if (parameters.containsKey("type") && parameters.get("type") != "") {
//                searchListByKeywordRequest.setType(parameters.get("type"));
//            }
//
//            if (parameters.containsKey("channelId") && parameters.get("channelId") != "") {
//                searchListByKeywordRequest.setChannelId(parameters.get("channelId"));
//            }

//            searchListByKeywordRequest.setFields("items(id/kind,id/videoId,snippet/title,snippet/thumbnails/default/url)");
//            searchListByKeywordRequest.setKey("AIzaSyAsphzlvbh80BzAsVLa_iwyo5OqP73XxF0");

            SearchListResponse response = search.execute();
            List<SearchResult> responseList = response.getItems();

            return responseList.stream()
                .map(this::convertSearchResult)
                .collect(Collectors.toList());

        } catch (GoogleJsonResponseException e) {
            e.printStackTrace();
            System.err.println("There was a service error: " + e.getDetails().getCode() + " : " + e.getDetails().getMessage());
        } catch (Throwable t) {
            t.printStackTrace();
        }

        return null;
    }

    private YouTube.Search.List buildSearch() throws IOException {
        YouTube.Search.List search = getYoutube().search().list("id,snippet");
        search.setKey(getAPIKey());
        search.setType("video");
        search.setFields("items(id/videoId,snippet/title)");
        search.setMaxResults(NUMBER_OF_VIDEOS_RETURNED);
        return search;
    }

    private String getAPIKey() {
        // Read the developer key from the properties file.
        Properties properties = new Properties();
        try {
            InputStream in = YoutubeService.class.getResourceAsStream("/" + PROPERTIES_FILENAME);
            properties.load(in);

        } catch (IOException e) {
            System.err.println("There was an error reading " + PROPERTIES_FILENAME + ": " + e.getCause()
                + " : " + e.getMessage());
            System.exit(1);
        }
        return "AIzaSyAsphzlvbh80BzAsVLa_iwyo5OqP73XxF0";
        //return properties.getProperty("youtube.apikey");
    }

    private static void prettyPrint(Iterator<SearchResult> iteratorSearchResults) {

        System.out.println("\n=============================================================");
        System.out.println("=============================================================\n");

        if (!iteratorSearchResults.hasNext()) {
            System.out.println(" There aren't any results for your query.");
        }

        while (iteratorSearchResults.hasNext()) {
            SearchResult singleVideo = iteratorSearchResults.next();
            ResourceId rId = singleVideo.getId();

            if (rId.getKind().equals("youtube#video")) {

                System.out.println(" Video Id" + rId.getVideoId());
                System.out.println(" Title: " + singleVideo.getSnippet().getTitle());
                System.out.println("\n-------------------------------------------------------------\n");
            }
        }
    }

    private rocks.zipcode.io.domain.SearchResult convertSearchResult(SearchResult googleResult) {
        rocks.zipcode.io.domain.SearchResult sr = new rocks.zipcode.io.domain.SearchResult();
        sr.setId(2L);
        sr.setVideoId(googleResult.getId().getVideoId());
        sr.setThumbnail(googleResult.getSnippet().getTitle());
        return sr;
    }
}

