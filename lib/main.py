import pandas as pd
import sys
import io
from sklearn.neighbors import NearestNeighbors

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')

# https://towardsdatascience.com/item-based-collaborative-filtering-in-python-91f747200fab
# 사용법: py main.py [유저이름] [출력장소개수]
# 현재 test data(user_location.csv)에서 유저 이름은 user0~user9999
# 유저 연동을 하려면 생성된 user_location.csv에 유저를 추가해야 함.
    # 1. 회원가입시 유저 추가하는 파이썬 파일을 호출하자.
        # -> 추가적인 파이썬 파일 만들어야 함.
        # -> 초기값이 없기 때문에 바로 추천을 못해준다. 그 사용자의 약속 기록이 쌓여야 추천 가능
            # --> 진행한 약속 수가 10개 이하면 추천을 하지말거나 전체로 봐서 가장 많이 잡은 약속 장소를 보여준다.
    # 2. 그냥 user0~user9999 중에 임의로 선택해서 출력하게 해서 모양만 내자


places = ['달성토성마을', '꽃보라동산', '운암지수변공원', '팔달대교 야경', '금호강하중도', '경북대학교 캠퍼스', '함지공원', '구암서원',
          '침산정', '부석사관광지', '경대북문', '대백 방천시장', '북성로', '시지광장', '칠곡 3지구', '광장코아', '야당', '안심역',
          '영남대', '카페스꼬비', '알리카페 대구 상인점', '오르다카페', '사운즈커피', '사택', '한훤당', '커피딜라이트투어']

df = pd.read_csv("user_location.csv")
df1 = df.copy()


def movie_recommender(user, num_neighbors, num_recommendation):
    number_neighbors = num_neighbors

    knn = NearestNeighbors(metric='cosine', algorithm='brute')
    knn.fit(df.values)
    distances, indices = knn.kneighbors(df.values, n_neighbors=number_neighbors)

    user_index = df.columns.tolist().index(user)

    for m, t in list(enumerate(df.index)):
        if df.iloc[m, user_index] == 0:
            sim_movies = indices[m].tolist()
            movie_distances = distances[m].tolist()

            if m in sim_movies:
                id_movie = sim_movies.index(m)
                sim_movies.remove(m)
                movie_distances.pop(id_movie)

            else:
                sim_movies = sim_movies[:number_neighbors - 1]
                movie_distances = movie_distances[:number_neighbors - 1]

            movie_similarity = [1 - x for x in movie_distances]
            movie_similarity_copy = movie_similarity.copy()
            nominator = 0

            for s in range(0, len(movie_similarity)):
                if df.iloc[sim_movies[s], user_index] == 0:
                    if len(movie_similarity_copy) == (number_neighbors - 1):
                        movie_similarity_copy.pop(s)
                    else:
                        movie_similarity_copy.pop(s - (len(movie_similarity) - len(movie_similarity_copy)))

                else:
                    nominator = nominator + movie_similarity[s] * df.iloc[sim_movies[s], user_index]

            if len(movie_similarity_copy) > 0:
                if sum(movie_similarity_copy) > 0:
                    predicted_r = nominator / sum(movie_similarity_copy)

                else:
                    predicted_r = 0

            else:
                predicted_r = 0

            df1.iloc[m, user_index] = predicted_r
    return recommend_movies(user, num_recommendation)


def recommend_movies(user, num_recommended_movies):
    recommended_movies = []

    for m in df[df[user] == 0].index.tolist():
        index_df = df.index.tolist().index(m)
        predicted_rating = df1.iloc[index_df, df1.columns.tolist().index(user)]
        recommended_movies.append((m, predicted_rating))

    sorted_rm = sorted(recommended_movies, key=lambda x: x[1], reverse=True)
    total = sorted_rm[:num_recommended_movies]
    watched = df[df[user] > 0][user]
    watched_ratings = watched.to_numpy()
    watched_index = watched.index

    for rating, index in zip(watched_ratings, watched_index):
        total.append((index, rating))

    total = sorted(total, key=lambda x: x[1], reverse=True)
    return total[:num_recommended_movies]


result = movie_recommender(sys.argv[1], 3, int(sys.argv[2]))
result_places = []

for place_idx, rating in result:
    print(places[place_idx])
