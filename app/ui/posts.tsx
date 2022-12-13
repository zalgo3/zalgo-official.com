import { makeStyles, shorthands, tokens, Caption1, Subtitle1, Avatar, Text, mergeClasses } from "@fluentui/react-components";
import { Card, CardHeader, CardPreview, CardProps } from "@fluentui/react-components/unstable"
import { type PostData } from "lib/posts"

const resolveAsset = (asset: string) => {
  const ASSET_URL = 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/';
  return `${ASSET_URL}${asset}`;
}

const useStyles = makeStyles({
  main: { ...shorthands.gap('36px'),
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  title: { ...shorthands.margin(0, 0, '12px')
  },
  card: {
    width: '300px',
    maxWidth: '100%',
    height: 'fit-content'
  },
  caption: {
    color: tokens.colorNeutralForeground3
  },
  flexContainer: {
    columnGap: '4px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  appIcon: { ...shorthands.borderRadius('4px'),
    height: '32px'
  },
  logoBadge: { ...shorthands.padding('5px'),
    ...shorthands.borderRadius(tokens.borderRadiusSmall),
    backgroundColor: '#FFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.14), 0px 0px 2px rgba(0, 0, 0, 0.12)'
  }
})

export const CardPost = (props: CardProps & PostData) => {
  const styles = useStyles()
  return (
      <Card className={styles.card} {...props}>
      <CardPreview logo={<img alt="app logo" src={resolveAsset('excel_logo.svg')} className={styles.logoBadge} />}>
        <img alt="file preview" src={resolveAsset('office2.png')} />
      </CardPreview>

      <CardHeader header={props.title} />
    </Card>
  )
}
