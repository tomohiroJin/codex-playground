FROM node:18

# 作業ディレクトリを設定
WORKDIR /workspace

# 必要なツールのインストール
RUN apt-get update && apt-get -y install git

# npmのグローバルパッケージをインストール
RUN npm install -g typescript ts-node nodemon jest

# タイムゾーンを設定
ENV TZ=Asia/Tokyo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# コンテナ起動時に実行されるコマンド
CMD [ "bash" ]
