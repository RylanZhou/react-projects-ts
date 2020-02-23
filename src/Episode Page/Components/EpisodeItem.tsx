import * as React from 'react'

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton
} from '@material-ui/core'
import { FaHeart } from 'react-icons/fa'

import { EpisodeIF } from '../types'
import { GlobalContext } from '../GlobalState'

interface EpisodeItemIF {
  episode: EpisodeIF
}

export default function EpisodeItem({ episode }: EpisodeItemIF) {
  const { setFavoriteAction } = React.useContext(GlobalContext)

  return (
    <Card className="episode">
      <CardHeader
        title={episode.name}
        subheader={`Season ${episode.season}, Episode ${episode.number}`}
        action={
          <IconButton
            className="favorite"
            color={episode.isFavorite ? 'secondary' : 'default'}
            onClick={() => setFavoriteAction(episode.id)}
          >
            <FaHeart />
          </IconButton>
        }
      />
      <CardMedia className="image" image={episode.image.original} />
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: episode.summary }}></div>
      </CardContent>
    </Card>
  )
}
