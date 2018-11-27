<template>
        <v-data-table
                :headers="headers"
                :items="payments"
                class="elevation-1"
                item-key="name"
        >
            <template slot="items" slot-scope="props">
                <tr @click="props.expanded = !props.expanded">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.description }}</td>
                    <td>{{ props.item.amount }}zł</td>
                    <td class="text-xs-right">

                        <CashBar
                                :current="seed[props.index][0]"
                                :target="seed[props.index][1]"
                        />
                    </td>
                </tr>
            </template>
            <template slot="expand" slot-scope="props">
                <v-card flat>
                    <v-card-text>
                        <div style="display:flex;flex-wrap:wrap;justify-content: space-between; align-items:center;">
                            <Payment
                                    v-for="(i, index) in payment_options"
                                    :key="index+1000"
                                    :name="i.name"
                                    :mark="i.mark"
                                    :votes="i.votes"
                                    :img="i.img"
                                    :path="i.path"
                            />
                        </div>
                    </v-card-text>
                </v-card>
            </template>
        </v-data-table>
</template>

<script>
    import CashBar from './CashBar'
    import Payment from './Payment'

  export default {
    name: 'active-payments-datatable',
    data: () => ({
      seed:[
          [8, 50],
          [25, 100],
          [6.5, 12.50],
          [350, 500],
          [250, 300],
          [230, 251.67],
        [0, 300],
        [0, 500],
        [0, 171],
        [0, 528],
        [0, 126],
        [0, 67]
      ],
      headers:[
        { text: 'Cel zbiórki', value: 'target' },
        { text: 'Opis', value: 'desc' },
        { text: 'Do zapłaty', value: 'amount' },
        { text: 'Zapłaciłem', value: 'progress' }
      ],
      payment_options:[
        {
          name: "Visa",
          mark: "4.6",
          votes: "140",
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png",
          path: "https://visa.com"
        },
        {
          name: "mBank",
          mark: "4.1",
          votes: "516",
          img: "https://prowly-uploads.s3.eu-west-1.amazonaws.com/uploads/press_rooms/company_logos/1513/51adea1d43c71_o_size_1068x623_q_71_h_b422f0.jpg",
          path: "https://mbank.pl"
        },
        {
          name: "blik",
          mark: "4.81",
          votes: "771",
          img: "http://paymentsjournal.com/wp-content/uploads/2017/11/blik-logo.jpg",
          path: "https://blik.pl"
        },
        {
          name: "Mastercard",
          mark: "4.78",
          votes: "1211",
          img: "https://cdn.vox-cdn.com/thumbor/s1mlYJ9ZyAvIe2RwlSq0IjNndlo=/0x64:1000x731/1200x800/filters:focal(0x64:1000x731)/cdn.vox-cdn.com/uploads/chorus_image/image/50124045/mastercard_logo.0.png",
          path: "https://mastercard.com"
        },
        {
          name: "PayU",
          mark: "4.73",
          votes: "997",
          img: "https://brandingmonitor.pl/wp-content/uploads/2015/06/new-rebranding-payu-nowe-logo-696x300.png",
          path: "https://payu.com"
        },
        {
            name: "Przelewy24",
            mark: "4.4",
            votes: "360",
            img: "https://www.przelewy24.pl/storage/app/uploads/public/5b7/c31/d0e/5b7c31d0edadf558249687.png",
            path: "https://przelewy24.pl"
        },
        {
          name: "PKO BP",
          mark: "4.9",
          votes: "2971",
          img: "https://www.pkobp.pl/static/dist/92ed8e81bb79e5f042131c2658d9e27d60ce888d/front/infosite/img/fb/pko.png",
          path: "https://pkobp.pl"
        },
        {
          name: "citiBank",
          mark: "4.29",
          votes: "87",
          img: "https://logodesignerblog.com/wp-content/uploads/2009/02/citibank.jpg",
          path: "https://citibank.pl"
        }
      ],
      payment_details:[],
      names:[
        "Liam", "Noah", "William", "James", "Logan", "Benjamin", "Mason", "Elijah", "Oliver", "Jacob", "Lucas", "Michael", "Alexander", "Ethan", "Daniel", "Matthew", "Aiden", "Henry", "Joseph", "Jackson", "Samuel", "Sebastian", "David", "Carter", "Wyatt", "Jayden", "John", "Owen", "Dylan", "Luke", "Gabriel", "Anthony", "Isaac", "Grayson", "Jack", "Julian", "Levi", "Christopher", "Joshua", "Andrew", "Lincoln", "Mateo", "Ryan", "Jaxon", "Nathan", "Aaron", "Isaiah", "Thomas", "Charles", "Caleb", "Josiah", "Christian", "Hunter", "Eli", "Jonathan", "Connor", "Landon", "Adrian", "Asher", "Cameron", "Leo", "Theodore", "Jeremiah", "Hudson", "Robert", "Easton", "Nolan", "Nicholas", "Ezra", "Colton", "Angel", "Brayden", "Jordan", "Dominic", "Austin", "Ian", "Adam", "Elias", "Greyson", "Jose", "Ezekiel", "Carson", "Evan", "Maverick", "Bryson", "Jace", "Cooper", "Xavier", "Parker", "Roman", "Jason", "Santiago", "Chase", "Sawyer", "Gavin", "Leonardo", "Ayden", "Jameson", "Kevin", "Bentley"
      ],
      lastNames:[
        'Abbott',
        'Acevedo',
        'Acosta',
        'Adams',
        'Adkins',
        'Aguilar',
        'Aguirre',
        'Albert',
        'Alexander',
        'Alford',
        'Allen',
        'Allison',
        'Alston',
        'Alvarado',
        'Alvarez',
        'Anderson',
        'Andrews',
        'Anthony',
        'Armstrong',
        'Arnold',
        'Ashley',
        'Atkins',
        'Atkinson',
        'Austin',
        'Avery',
        'Avila',
        'Ayala',
        'Ayers',
        'Bailey',
        'Baird',
        'Baker',
        'Baldwin',
        'Ball',
        'Ballard',
        'Banks',
        'Barber',
        'Barker',
        'Barlow',
        'Barnes',
        'Barnett',
        'Barr',
        'Barrera',
        'Barrett',
        'Barron',
        'Barry',
        'Bartlett',
        'Barton',
        'Bass',
        'Bates',
        'Battle',
        'Bauer',
        'Baxter',
        'Beach',
        'Bean',
        'Beard',
        'Beasley',
        'Beck',
        'Becker',
        'Bell',
        'Bender',
        'Benjamin',
        'Bennett',
        'Benson',
        'Bentley',
        'Benton',
        'Berg',
        'Berger',
        'Bernard',
        'Berry',
        'Best',
        'Bird',
        'Bishop',
        'Black',
        'Blackburn',
        'Blackwell',
        'Blair',
        'Blake',
        'Blanchard',
        'Blankenship',
        'Blevins',
        'Bolton',
        'Bond',
        'Bonner',
        'Booker',
        'Boone',
        'Booth',
        'Bowen',
        'Bowers',
        'Bowman',
        'Boyd',
        'Boyer',
        'Boyle',
        'Bradford',
        'Bradley',
        'Bradshaw',
        'Brady',
        'Branch',
        'Bray',
        'Brennan',
        'Brewer',
        'Bridges',
        'Briggs',
        'Bright',
        'Britt',
        'Brock',
        'Brooks',
        'Brown',
        'Browning',
        'Bruce'
      ]
    }),
    computed:{
      payments(){
        let now = new Date();
        //console.log(this.$store.getters['payments/getPayments'])
        return this.$store.getters['payments/getPayments'];
      }
    },
    components:{
      CashBar,
      Payment
    },
    mounted(){
        for(let h = 0; h < 100; h++) {
          this.payment_details.push({
            name: this.names[Math.round(Math.random()*this.names.length)],
            last: this.last[Math.round(Math.random()*this.lastNames.length)]
          });
        }
    }
  };
</script>

<style scoped>

</style>