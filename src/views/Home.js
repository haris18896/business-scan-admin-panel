import { Card, CardHeader, CardTitle, Row, Col } from 'reactstrap'
import StatsCard from './stats'

const Home = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Stats</CardTitle>
        </CardHeader>
        <Row className='match-height'>
          <Col xl='12' md='12' xs='12'>
            <StatsCard cols={{ xl: '4', md: '6' }} />
          </Col>
        </Row>
      </Card>
    </div>
  )
}


export default Home
