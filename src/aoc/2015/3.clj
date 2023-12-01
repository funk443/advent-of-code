;;;; Copyright (C) 2023  CToID <funk443@yandex.com>
;;;; 
;;;; This program is free software: you can redistribute it and/or modify it
;;;; under the terms of the GNU General Public License as published by the Free
;;;; Software Foundation, either version 3 of the License, or
;;;; (at your option) any later version.
;;;; 
;;;; This program is distributed in the hope that it will be useful, but WITHOUT
;;;; ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
;;;; FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
;;;; more details.
;;;; 
;;;; You should have received a copy of the GNU General Public License along
;;;; with this program.  If not, see <https://www.gnu.org/licenses/>.


(ns aoc.2015.3
  (:use [clojure.string :only [trim]]))


(defn main []
  (let [instructions (map {\< #(update % :x dec)
                           \> #(update % :x inc)
                           \^ #(update % :y inc)
                           \v #(update % :y dec)}
                          (trim (slurp "resource/2015/input3")))
        result1 (-> (reduce (fn [m move]
                              (as-> (update m :santa move) new-map
                                (update new-map
                                        :history
                                        #(conj % (:santa new-map)))))
                            {:history #{}
                             :santa {:x 0 :y 0}}
                            instructions)
                    :history
                    count)
        result2 (-> (reduce (fn [{:keys [who] :as m} move]
                              (as-> (update m who move) new-map
                                (update new-map
                                        :history
                                        #(conj % (who new-map)))
                                (assoc new-map
                                       :who
                                       (if (= who :santa) :robo-santa :santa))))
                            {:history #{}
                             :santa {:x 0 :y 0}
                             :robo-santa {:x 0 :y 0}
                             :who :santa}
                            instructions)
                    :history
                    count)]
    (printf "Part 1: %s%nPart 2: %s%n"
            result1
            result2)
    (flush)
    [result1 result2]))
