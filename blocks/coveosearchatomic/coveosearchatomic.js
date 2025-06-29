
async function loadCoveoTemplate() {
    await customElements.whenDefined("atomic-search-interface");
        const searchInterface = document.querySelector("#search");

        await searchInterface.initialize({
          accessToken: "xx29e62e9b-f739-4886-b433-c9326cc1b492",
          organizationId: "docsdemoslhkhaxyy",
        });
        searchInterface.executeFirstSearch();
}

function coveoSearchTemplate() {
    return `
    <atomic-search-interface id="search" fields-to-include='["ytlikecount",
                                                            "ytviewcount",
                                                            "ytthumbnailurl",
                                                            "ytviewrating"]'>
      <atomic-search-layout>
        <atomic-layout-section section="search">
          <atomic-search-box></atomic-search-box>
        </atomic-layout-section>
        <atomic-layout-section section="facets">
          <atomic-facet-manager>
            <atomic-facet
              field="source"
              label="Source"
            ></atomic-facet>
            <atomic-facet
              field="language"
              label="Language"
            ></atomic-facet>
            <atomic-timeframe-facet
              label="Timeframe"
              with-date-picker="true"
              is-collapsed="true"
            >
              <atomic-timeframe unit="hour"></atomic-timeframe>
              <atomic-timeframe unit="day"></atomic-timeframe>
              <atomic-timeframe unit="week"></atomic-timeframe>
              <atomic-timeframe unit="month"></atomic-timeframe>
              <atomic-timeframe unit="quarter"></atomic-timeframe>
              <atomic-timeframe unit="year"></atomic-timeframe>
            </atomic-timeframe-facet>
            <atomic-numeric-facet
              field="ytlikecount"
              label="YouTube Likes"
              display-values-as="link"
            >
              <atomic-numeric-range
                start="0"
                end="1000"
                label="Unpopular"
              ></atomic-numeric-range>
              <atomic-numeric-range
                start="1000"
                end="8000"
                label="Well liked"
              ></atomic-numeric-range>
              <atomic-numeric-range
                start="8000"
                end="100000"
                label="Popular"
              ></atomic-numeric-range>
              <atomic-numeric-range
                start="100000"
                end="999999999"
                label="Treasured"
              ></atomic-numeric-range>
            </atomic-numeric-facet>
            <atomic-color-facet
              field="filetype"
              label="File Type"
              number-of-values="3"
              sort-criteria="occurrences"
            ></atomic-color-facet>
          </atomic-facet-manager>
        </atomic-layout-section>  
        <atomic-layout-section section="main">
          <atomic-tab-manager clear-filters-on-tab-change="false">
            <atomic-tab name="all" label="All"></atomic-tab>
            <atomic-tab name="YouTubeVideo" label="YouTube Video" expression="@filetype=YouTubeVideo"></atomic-tab>
            <atomic-tab name="rssitem" label="RSS Item" expression="@filetype=rssitem"></atomic-tab>
            <atomic-tab name="YouTubePlaylist" label="YouTube Playlist" expression="@filetype=YouTubePlaylist"></atomic-tab>
          </atomic-tab-manager>
          <atomic-layout-section section="status">
            <atomic-breadbox></atomic-breadbox>
            <atomic-query-summary></atomic-query-summary>
            <atomic-refine-toggle></atomic-refine-toggle>
            <atomic-sort-dropdown>
              <atomic-sort-expression
                label="Relevance"
                expression="relevancy, ytlikecount descending"
              >
              </atomic-sort-expression>
              <atomic-sort-expression
                label="Date"
                expression="date descending"
              >
              </atomic-sort-expression>
            </atomic-sort-dropdown>
            <atomic-did-you-mean></atomic-did-you-mean>
          </atomic-layout-section>
          <atomic-layout-section section="results">
            <atomic-result-list
              display="grid"
              image-size="large"
            >
              <atomic-result-template>
                <template>
                  <style>
                    atomic-result-section-badges {
                      display: flex;
                    }

                    atomic-result-section-badges > atomic-field-condition {
                      display: inline-block;
                      height: 100%;
                    }

                    #youtubevideo-ted::part(result-badge-element) {
                      background-color: red;
                      color: white;
                    }

                    #youtubevideo-tedx::part(result-badge-element) {
                      background-color:white;
                      color: red;
                      border: 1px solid black;
                    }

                    #youtubevideo-ted-ed::part(result-badge-element) {
                      background-color: black;
                      color: red;
                    }
                  </style>
                  <atomic-result-section-visual>
                    <atomic-field-condition must-match-sourcetype="YouTube">
                      <atomic-result-image field="ytthumbnailurl"></atomic-result-image>
                    </atomic-field-condition>
                    <atomic-field-condition must-match-sourcetype="RSS">
                      <img src="https://cdn.cdnlogo.com/logos/r/89/rss.svg"/>
                    </atomic-field-condition>
                  </atomic-result-section-visual>
                  <atomic-result-section-badges>
                    <atomic-field-condition must-match-author="TED">
                      <atomic-result-badge
                        field="author"
                        id="youtubevideo-ted"
                      ></atomic-result-badge>
                    </atomic-field-condition>
                    <atomic-field-condition must-match-author="TEDx Talks">
                      <atomic-result-badge
                        field="author"
                        id="youtubevideo-tedx"
                      ></atomic-result-badge>
                    </atomic-field-condition>
                    <atomic-field-condition must-match-author="TED-Ed">
                      <atomic-result-badge
                        field="author"
                        id="youtubevideo-ted-ed"
                      ></atomic-result-badge>
                    </atomic-field-condition>
                    <atomic-field-condition if-defined="language">
                      <atomic-result-badge
                        icon="https://raw.githubusercontent.com/Rush/Font-Awesome-SVG-PNG/master/black/svg/language.svg"
                      >
                        <atomic-result-multi-value-text field="language"></atomic-result-multi-value-text>
                      </atomic-result-badge>
                    </atomic-field-condition>
                  </atomic-result-section-badges>
                  <atomic-result-section-title-metadata>
                    <atomic-field-condition if-defined="ytviewrating">
                      <atomic-result-rating field="ytviewrating"></atomic-result-rating>
                    </atomic-field-condition>
                    <atomic-field-condition if-not-defined="ytviewrating">
                      <atomic-result-printable-uri></atomic-result-printable-uri>
                    </atomic-field-condition>
                  </atomic-result-section-title-metadata>
                  <atomic-result-section-bottom-metadata>
                    <atomic-result-fields-list>
                      <atomic-field-condition if-defined="date">
                          <span class="field-label">Date Published:</span>
                          <atomic-result-date></atomic-result-date>
                      </atomic-field-condition>
                    </atomic-result-fields-list>
                  </atomic-result-section-bottom-metadata>
                  <atomic-result-section-title>
                    <atomic-result-link target="_blank"></atomic-result-link>
                  </atomic-result-section-title>
                  <atomic-result-section-excerpt>
                    <atomic-result-text field="excerpt"></atomic-result-text>
                  </atomic-result-section-excerpt>
                </template>
              </atomic-result-template>
            </atomic-result-list>
            <atomic-query-error></atomic-query-error>
            <atomic-no-results></atomic-no-results>
          </atomic-layout-section>
          <atomic-layout-section section="pagination">
            <atomic-load-more-results></atomic-load-more-results>
          </atomic-layout-section>
        </atomic-layout-section>
      </atomic-search-layout>
    </atomic-search-interface>`;
}

export default async function decorate(block) {
    const blockContents = block.querySelector(':scope > div > div');
    const url = `https://static.cloud.coveo.com/atomic/v3/atomic.esm.js`;
    const script = document.createElement('script');
    script.src = url;
    script.type = "module";
    const head = document.head;
    head.appendChild(script);


    script.onload = () => {
        const searchTemplate = coveoSearchTemplate();
        blockContents.insertAdjacentHTML("beforeend", searchTemplate);
        loadCoveoTemplate();
    };

    script.onerror = (error) => {
      console.error(`Failed to load script: ${url}. Error: ${error}`);
    };
}
