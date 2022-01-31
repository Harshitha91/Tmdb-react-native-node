import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import ReadMore from 'react-native-read-more-text';

import Screen from '../../components/common/Screen';
import Spinner from '../../components/common/Spinner';
import NotificationCard from '../../components/cards/NotificationCard';
import PosterRow from '../../components/cards/rows/PosterRow';
import PersonListRow from '../../components/cards/rows/PersonListRow';
import PersonRow from '../../components/cards/rows/PersonRow';
import SectionRow from '../../components/cards/rows/SectionRow';
import MainInfoRow from '../../components/cards/rows/MainInfoRow';
import { TouchableOpacity } from '../../components/common/TouchableOpacity';

import request from '../../services/api';

import { convertMinsToHrsMins } from '../../utils/time';
import { convertToUpperCaseFirstLetter } from '../../utils/letters';
import { convertToDate } from '../../utils/dates';
import { convertToDolar } from '../../utils/currency';
import { convertToGenres } from '../../utils/genre';
import { sliceArrayLength } from '../../utils/array';

import isoLanguage from '../../data/iso.json';

import styles from './styles';

const UNINFORMED = 'Uninformed';
const INITIAL_INFO = {
  id: '',
  backdropPath: '',
  title: '',
  overview: UNINFORMED,
  cast: [],
  crew: [],
  productionCompanies: [],
  infosDetail: {
    Duration: UNINFORMED,
    Genre: UNINFORMED,
    Language: UNINFORMED,
    Release: UNINFORMED,
    Budget: UNINFORMED,
    Revenue: UNINFORMED,
    Adult: UNINFORMED
  }
};
const ADULT_RATE = {
  true: 'No',
  false: 'Yes'
};

const renderReadMoreFooter = (text, handlePress) => (
  <TouchableOpacity onPress={handlePress}>
    <Text style={styles.readMore}>{text}</Text>
  </TouchableOpacity>
);

const MovieDetails = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState(INITIAL_INFO);

  const getInfosDetail = ({
    runtime = 0,
    genres = '',
    original_language = '',
    release_date = '',
    budget = 0,
    revenue = 0,
    adult = ''
  }) => ({
    Duration: convertMinsToHrsMins(runtime),
    Genre: convertToGenres(sliceArrayLength(genres, 2)),
    Language: convertToUpperCaseFirstLetter(isoLanguage[original_language]),
    Release: convertToDate(release_date),
    Budget: convertToDolar(budget),
    Revenue: convertToDolar(revenue),
    Adult: ADULT_RATE[adult] || UNINFORMED
  });

  const requestMoviesInfo = async () => {
    try {
      setIsLoading(true);

      const { id } = route.params;
      const data = await request(`movie/${id}`);

      setIsLoading(false);
      setIsError(false);
      setInfo({
        id,
        backdropPath: data.backdrop_path || INITIAL_INFO.backdropPath,
        title: data.title || INITIAL_INFO.title,
        overview: data.overview || INITIAL_INFO.overview,
        infosDetail: getInfosDetail(data)
      });
    } catch (err) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const renderItem = (item, type, handleTeamDetail) => (
    <PersonRow item={item} type={type} onTeamDetail={handleTeamDetail} />
  );

  const renderListEmpty = () => (
    <View>
      <Text style={styles.subTitleInfo}>Uninformed</Text>
    </View>
  );

  useEffect(() => {
    requestMoviesInfo();
  }, []);

  {
    const {
      backdropPath,
      title,
      infosDetail,
      overview,
      cast,
      crew,
      productionCompanies,
    } = info;

    return (
      <Screen>
        <View style={styles.container}>
          {isLoading ? (
            <Spinner />
          ) : isError ? (
            <NotificationCard
              icon="alert-octagon"
              onPress={requestMoviesInfo}
            />
          ) : (
            <ScrollView>
              <PosterRow
                title={title}
                backdropPath={backdropPath}
              />
              <View style={styles.containerMovieInfo}>
                <MainInfoRow data={infosDetail} />
                <SectionRow title="Synopsis">
                  <ReadMore
                    numberOfLines={3}
                    renderTruncatedFooter={(handlePress) =>
                      renderReadMoreFooter('Read more', handlePress)
                    }
                    renderRevealedFooter={(handlePress) =>
                      renderReadMoreFooter('Read less', handlePress)
                    }
                  >
                    <Text style={styles.subTitleInfo}>{overview}</Text>
                  </ReadMore>
                </SectionRow>
                <SectionRow title="Main cast">
                  <PersonListRow
                    data={cast}
                    type="character"
                    keyItem="creditId"
                    ListEmptyComponent={renderListEmpty}
                    renderItem={renderItem}
                  />
                </SectionRow>
                <SectionRow title="Main technical team">
                  <PersonListRow
                    data={crew}
                    type="job"
                    keyItem="creditId"
                    ListEmptyComponent={renderListEmpty}
                    renderItem={renderItem}
                  />
                </SectionRow>
                <SectionRow title="Producer" isLast>
                  <PersonListRow
                    data={productionCompanies}
                    type="production"
                    keyItem="id"
                    ListEmptyComponent={renderListEmpty}
                    renderItem={renderItem}
                  />
                </SectionRow>
              </View>
            </ScrollView>
          )}
        </View>
      </Screen>
    );
  }
};

export default MovieDetails;
