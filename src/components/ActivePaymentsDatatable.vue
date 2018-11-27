<template>
        <v-data-table
                :headers="headers"
                :items="payments"
                class="elevation-1"
                item-key="name"
        >
            <template slot="items" slot-scope="props">
                <tr>
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.amount }}zł</td>
                    <td class="text-xs-right">
                        <CashBar
                                :current="seed[props.index][0]"
                                :target="seed[props.index][1]"
                        />
                    </td>
                </tr>
            </template>
        </v-data-table>
</template>

<script>
    import CashBar from './CashBar'
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
        { text: 'Kwota na osobę', value: 'amount' },
        { text: 'Postęp', value: 'progress' }
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
      CashBar
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